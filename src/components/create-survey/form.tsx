'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import * as Styles from './styles';
import { SurveyModel } from '@/models/SurveyModel';
import { uploadToPinataSurveyGroup } from '@/utils/pinataUpload';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { initializeSurveyStats } from '@/utils/surveyStats';
import { addCreatedSurvey } from '@/utils/updateUserSurveys';
import {
	PublicKey,
	Transaction,
	SystemProgram,
	LAMPORTS_PER_SOL,
	sendAndConfirmTransaction,
	Keypair,
} from '@solana/web3.js';
import toast from 'react-hot-toast';

// Types
export interface FormData {
	title: string;
	surveyType: 'FREE' | 'PAID';
	reward: string;
	maxResponses: string;
	questions: Question[];
	totalFounde: string;
	status: 'ACTIVE' | 'COMPLETED';
	expireTime: string;
}

export interface Question {
	text: string;
	options: string[];
}

interface SurveyFormProps {
	onSubmit: (data: FormData) => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
	const { publicKey } = useWallet();
	const { connection } = useConnection();
	const router = useRouter();

	const [formData, setFormData] = useState<FormData>({
		title: '',
		surveyType: 'FREE',
		reward: '',
		maxResponses: '',
		totalFounde: '',
		status: 'ACTIVE',
		expireTime: '',
		questions: [],
	});

	// For local persistence
	useEffect(() => {
		const savedData = localStorage.getItem('lastSurvey');
		if (savedData) {
			setFormData(JSON.parse(savedData));
		}
	}, []);

	// Handler for input changes
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleQuestionChange = (
		index: number,
		field: keyof Question,
		value: string
	) => {
		const newQuestions = [...formData.questions];
		newQuestions[index] = { ...newQuestions[index], [field]: value };
		setFormData(prev => ({ ...prev, questions: newQuestions }));
	};

	const handleOptionChange = (
		questionIndex: number,
		optionIndex: number,
		value: string
	) => {
		const newQuestions = [...formData.questions];
		newQuestions[questionIndex].options[optionIndex] = value;
		setFormData(prev => ({ ...prev, questions: newQuestions }));
	};

	const addQuestion = () => {
		setFormData(prev => ({
			...prev,
			questions: [...prev.questions, { text: '', options: ['', '', '', ''] }],
		}));
	};

	const removeQuestion = (index: number) => {
		setFormData(prev => ({
			...prev,
			questions: prev.questions.filter((_, i) => i !== index),
		}));
	};

	// Dummy function that passes the form data to a parent handler
	const registerSurvey = (
		ipfsCid: string,
		surveyType: string,
		reward: string
	) => {
		console.log(
			'Registering survey with IPFS CID:',
			ipfsCid,
			surveyType,
			reward
		);
		onSubmit(formData);
	};

	// The main submit handler: processes survey submission and sends a reward transfer.
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!publicKey) {
			alert('Please connect your wallet first');
			return;
		}

		try {
			// Construct the survey model (adjust according to your SurveyModel definition)
			const surveyData: SurveyModel = {
				surveyId: `survey_${Date.now()}`,
				title: formData.title,
				creator: publicKey.toString(),
				questions: formData.questions.map(q => ({
					question: q.text,
					options: q.options.filter(opt => opt.trim() !== ''),
				})),
				reward: {
					amount: parseFloat(formData.reward) || 0,
					token: 'SOL',
				},
				createdAt: new Date().toISOString(),
				status: formData.status,
				maxResponses: parseInt(formData.maxResponses) || 0,
				expireTime: formData.expireTime,
				surveyType: formData.surveyType,
				stats_surway_cid: '',
				cid: '',
			};

			// Validate questions
			if (
				surveyData.questions.some(
					q => !q.question.trim() || q.options.length < 2
				)
			) {
				alert('Each question must have a title and at least 2 options');
				return;
			}

			// Initialize survey stats (assumes initializeSurveyStats returns an object with a 'cid' property)
			const { cid: statsSurveyCid } = await initializeSurveyStats(
				surveyData.surveyId,
				surveyData.questions
			);
			console.log('Survey stats initialized');
			surveyData.stats_surway_cid = statsSurveyCid;

			// Upload survey to Pinata (adjust the utility function as needed)
			console.log('Uploading survey to Pinata:', surveyData);
			const uploadResult = await uploadToPinataSurveyGroup(
				surveyData,
				`${surveyData.surveyId}.json`
			);
			console.log('Survey uploaded successfully:', uploadResult);

			// Update user's created surveys list
			console.log(
				'Calling addCreatedSurvey with:',
				publicKey.toString(),
				surveyData.surveyId
			);
			await addCreatedSurvey(
				uploadResult.ipfsHash,
				publicKey.toString(),
				surveyData.surveyId
			);
			console.log('addCreatedSurvey completed');

			// Call registerSurvey to notify parent or further processing
			registerSurvey(
				uploadResult.ipfsHash,
				formData.surveyType,
				formData.reward
			);

			// ------------------------------------------------------------------
			// Transaction Logic: Send reward from a hardcoded creator to a voter.
			// ------------------------------------------------------------------

			// HARD-CODED CREATOR KEYPAIR (for testing only!)
			// Replace the following array with your actual secret key array (generated by solana-keygen)

			// Clear the form
			setFormData({
				title: '',
				surveyType: 'FREE',
				reward: '',
				maxResponses: '',
				totalFounde: '',
				status: 'ACTIVE',
				expireTime: '',
				questions: [],
			});

			// Optionally, navigate to another page
			// router.push("/survey-market");
		} catch (error: any) {
			console.error('Error submitting survey:', error);
			toast.error(
				error instanceof Error
					? error.message
					: 'Failed to submit survey. Please try again.'
			);
		} finally {
			const creatorSecretKey = Uint8Array.from([
				12, 154, 228, 22, 170, 74, 14, 239, 241, 135, 131, 199, 194, 62, 183,
				158, 168, 153, 247, 93, 251, 196, 171, 206, 192, 248, 216, 236, 158, 15,
				166, 230, 178, 79, 26, 228, 143, 3, 255, 50, 254, 244, 3, 198, 147, 20,
				49, 199, 232, 189, 89, 236, 219, 141, 202, 64, 200, 74, 76, 87, 17, 198,
				25, 67,
			]);
			const creatorKeypair = Keypair.fromSecretKey(creatorSecretKey);

			// HARD-CODED VOTER PUBLIC KEY (for testing)
			// Replace with the desired recipient's public key.
			const voterPubKey = new PublicKey(
				'D13XoehAfwTVJx69VtQhqAjqypXrdpHpRVN3vZfnxkt2'
			);

			// Build the transaction to transfer 0.1 SOL.
			const transaction = new Transaction().add(
				SystemProgram.transfer({
					fromPubkey: creatorKeypair.publicKey,
					toPubkey: voterPubKey,
					lamports: 0.1 * LAMPORTS_PER_SOL,
				})
			);
			transaction.feePayer = creatorKeypair.publicKey;
			const { blockhash } = await connection.getLatestBlockhash();
			transaction.recentBlockhash = blockhash;

			// Sign and send the transaction
			const signature = await sendAndConfirmTransaction(
				connection,
				transaction,
				[creatorKeypair]
			);
			console.log('Reward sent with tx:', signature);
			toast.success('Survey submitted and reward sent 🎉');
		}
	};

	// Local state to manage current question index for preview/navigation
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const isLastQuestion = currentQuestionIndex === formData.questions.length - 1;
	const isFirstQuestion = currentQuestionIndex === 0;
	const currentQuestion = formData.questions[currentQuestionIndex];

	return (
		<>
			<Styles.Header>
				<h1>Create Survey</h1>
				<Styles.SubmitButton
					onClick={() => handleSubmit(new Event('submit') as any)}
					type='button'
				>
					Submit The Survey
				</Styles.SubmitButton>
			</Styles.Header>
			<Styles.Wrapper>
				<Styles.FormContainer>
					<Styles.FormSection>
						<Styles.Label>Survey Title</Styles.Label>
						<Styles.Input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleChange}
							placeholder='Enter survey title'
						/>
					</Styles.FormSection>
					<Styles.FormSection>
						<Styles.Label>Survey Type</Styles.Label>
						<select
							name='surveyType'
							value={formData.surveyType}
							onChange={handleChange}
							style={{
								width: '100%',
								padding: '10px',
								background: '#0A1330',
								border: '1px solid #343B4F',
								borderRadius: '4px',
								color: '#AEB9E1',
								height: '45px',
							}}
						>
							<option value='FREE'>Free</option>
							<option value='PAID'>Paid</option>
						</select>
					</Styles.FormSection>
					<Styles.FormSection>
						<Styles.Label>Total Founde</Styles.Label>
						<Styles.Input
							type='text'
							name='totalFounde'
							value={formData.totalFounde}
							onChange={handleChange}
							placeholder='e.g., 50SOl'
						/>
					</Styles.FormSection>
					<Styles.FormSection>
						<Styles.Label>Reward per Response (SOL)</Styles.Label>
						<Styles.Input
							type='number'
							name='reward'
							value={formData.reward}
							onChange={handleChange}
							step='0.01'
							placeholder='e.g., 0.1'
						/>
					</Styles.FormSection>
					<Styles.FormSection>
						<Styles.Label>Max Responses</Styles.Label>
						<Styles.Input
							type='number'
							name='maxResponses'
							value={formData.maxResponses}
							onChange={handleChange}
							placeholder='e.g., 50'
						/>
					</Styles.FormSection>
					<Styles.FormSection>
						<Styles.Label>Expire Time</Styles.Label>
						<Styles.Input
							type='date'
							name='expireTime'
							value={formData.expireTime}
							onChange={handleChange}
							placeholder='e.g., 2024-12-31'
						/>
					</Styles.FormSection>
					<Styles.FormSection>
						<Styles.Label>Questions</Styles.Label>
						{formData.questions.map((question, questionIndex) => (
							<Styles.QuestionCard key={questionIndex}>
								<Styles.QuestionHeader>
									<Styles.Input
										type='text'
										value={question.text}
										onChange={e =>
											handleQuestionChange(
												questionIndex,
												'text',
												e.target.value
											)
										}
										placeholder={`Question ${questionIndex + 1}`}
										style={{ flex: 1 }}
									/>
								</Styles.QuestionHeader>
								<Styles.OptionList>
									{question.options.map((option, optionIndex) => (
										<Styles.OptionItem key={optionIndex}>
											<Styles.OptionInput
												type='text'
												value={option}
												onChange={e =>
													handleOptionChange(
														questionIndex,
														optionIndex,
														e.target.value
													)
												}
												placeholder={`Option ${optionIndex + 1}`}
											/>
										</Styles.OptionItem>
									))}
								</Styles.OptionList>
								<Styles.RemoveButton
									onClick={() => removeQuestion(questionIndex)}
								>
									<Image
										src='/assets/remove.svg'
										alt='Remove'
										width={20}
										height={20}
									/>
									remove
								</Styles.RemoveButton>
							</Styles.QuestionCard>
						))}
						<Styles.AddQuestionButton type='button' onClick={addQuestion}>
							Add Question
						</Styles.AddQuestionButton>
					</Styles.FormSection>
				</Styles.FormContainer>
				<Styles.PreviewContainer>
					<Styles.PreviewTitle>
						Survey Preview: {formData.title || 'Untitled'}
					</Styles.PreviewTitle>
					{formData.questions.map((question, index) => (
						<div key={index}>
							<Styles.PreviewQuestion>
								<strong>Question {index + 1}:</strong>{' '}
								{question.text || 'Untitled Question'}
							</Styles.PreviewQuestion>
							{question.options.map((option, optionIndex) => (
								<Styles.PreviewOption key={optionIndex}>
									- {option || `Option ${optionIndex + 1}`}
								</Styles.PreviewOption>
							))}
						</div>
					))}
				</Styles.PreviewContainer>
			</Styles.Wrapper>
		</>
	);
};

export default SurveyForm;
