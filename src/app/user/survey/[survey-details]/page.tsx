'use client';

import { useState } from 'react';
import * as Styles from '@/components/user/surveys/survey-details/style';
import Image from 'next/image';
import { toast } from 'react-toastify';
import {
	Transaction,
	SystemProgram,
	LAMPORTS_PER_SOL,
	sendAndConfirmTransaction,
	Keypair,
	PublicKey,
} from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';

// Types for survey data
interface Question {
	text: string;
	options: string[];
}

interface Survey {
	id: string;
	title: string;
	type: 'FREE' | 'PAID';
	reward: number;
	maxResponses: number;
	questions: Question[];
}

interface SurveyDetailPageProps {
	params: { surveyId: string };
}

const SurveyDetailPage: React.FC<SurveyDetailPageProps> = ({ params }) => {
	const { connection } = useConnection();

	// Hardcoded survey data for demonstration.
	const mockSurvey: Survey = {
		id: params.surveyId,
		title: 'Solana User Feedback Survey',
		type: 'PAID',
		reward: 0.1,
		maxResponses: 50,
		questions: [
			{
				text: 'How often do you use Solana?',
				options: ['Daily', 'Weekly', 'Monthly', 'Never'],
			},
			{
				text: "What do you think about Solana's transaction speed?",
				options: ['Excellent', 'Good', 'Average', 'Poor'],
			},
		],
	};

	// -----------------------------------------------------------------------
	// HARD-CODED CREATOR KEYPAIR (for testing only!)
	//
	// Replace the array below with your own secret key array. You can generate one with:
	//    solana-keygen new --outfile ~/my-keypair.json
	// Then open the JSON file and copy the array.
	// -----------------------------------------------------------------------
	const creatorSecretKey = Uint8Array.from([
		12, 154, 228, 22, 170, 74, 14, 239, 241, 135, 131, 199, 194, 62, 183, 158,
		168, 153, 247, 93, 251, 196, 171, 206, 192, 248, 216, 236, 158, 15, 166,
		230, 178, 79, 26, 228, 143, 3, 255, 50, 254, 244, 3, 198, 147, 20, 49, 199,
		232, 189, 89, 236, 219, 141, 202, 64, 200, 74, 76, 87, 17, 198, 25, 67,
	]);
	const creatorKeypair = Keypair.fromSecretKey(creatorSecretKey);
	// For testing, we also hardcode the voter address.
	// Replace this with the voter's public key (or derive it as needed).
	const voterPubKey = new PublicKey(
		'D13XoehAfwTVJx69VtQhqAjqypXrdpHpRVN3vZfnxkt2'
	);

	// Local state for survey responses
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [responses, setResponses] = useState<string[]>(
		new Array(mockSurvey.questions.length).fill('')
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [direction, setDirection] = useState<'next' | 'prev'>('next');

	const handleResponseChange = (questionIndex: number, option: string) => {
		const newResponses = [...responses];
		newResponses[questionIndex] = option;
		setResponses(newResponses);
	};

	const handleNext = () => {
		if (currentQuestionIndex < mockSurvey.questions.length - 1) {
			setDirection('next');
			setCurrentQuestionIndex(prev => prev + 1);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setDirection('prev');
			setCurrentQuestionIndex(prev => prev - 1);
		}
	};

	// When the user submits the survey, submit the survey and transfer the reward.
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// 1. Process survey responses (simulate survey submission)
			console.log('Survey Responses:', responses);
			alert('Survey submitted successfully!');

			// 2. Create and send a transaction transferring reward from the creator to the voter.

			// Reset responses (if needed)
			setResponses(new Array(mockSurvey.questions.length).fill(''));
			setCurrentQuestionIndex(0);
		} catch (error) {
			console.error('Error transferring reward:', error);
			toast.error('Failed to submit survey and transfer reward');
		} finally {
			setIsSubmitting(false);
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

			const signature = await sendAndConfirmTransaction(
				connection,
				transaction,
				[creatorKeypair]
			);
			console.log('Reward sent with tx:', signature);
			toast.success('Survey submitted and reward sent 🎉');
		}
	};

	const isLastQuestion =
		currentQuestionIndex === mockSurvey.questions.length - 1;
	const isFirstQuestion = currentQuestionIndex === 0;
	const currentQuestion = mockSurvey.questions[currentQuestionIndex];

	return (
		<div>
			<Styles.DetailContainer>
				<form onSubmit={handleSubmit}>
					<Styles.FormTitle>Submit Your Responses</Styles.FormTitle>
					<Styles.QuestionWrapper
						direction={direction}
						key={currentQuestionIndex}
					>
						<Styles.QuestionCard>
							<Styles.QuestionText>
								{currentQuestionIndex + 1}. {currentQuestion.text}
							</Styles.QuestionText>
							<Styles.OptionList>
								{currentQuestion.options.map((option, optionIndex) => (
									<Styles.OptionLabel key={optionIndex}>
										<Styles.OptionInput
											type='radio'
											name={`question-${currentQuestionIndex}`}
											value={option}
											checked={responses[currentQuestionIndex] === option}
											onChange={() =>
												handleResponseChange(currentQuestionIndex, option)
											}
											required
										/>
										{option}
									</Styles.OptionLabel>
								))}
							</Styles.OptionList>
						</Styles.QuestionCard>
					</Styles.QuestionWrapper>
					<Styles.NavigationButtons>
						<Styles.NavButton
							type='button'
							onClick={handlePrevious}
							disabled={isFirstQuestion || isSubmitting}
						>
							Previous
						</Styles.NavButton>
						{isLastQuestion ? (
							<Styles.SubmitButton type='submit' disabled={isSubmitting}>
								{isSubmitting ? 'Submitting...' : 'Submit Responses'}
							</Styles.SubmitButton>
						) : (
							<Styles.NavButton
								type='button'
								onClick={handleNext}
								disabled={responses[currentQuestionIndex] === ''}
							>
								Next
							</Styles.NavButton>
						)}
					</Styles.NavigationButtons>
				</form>
				<Styles.SurveyLeftside>
					<Styles.SurveyHeader $active={false}>
						<Styles.SurveyTitle>{mockSurvey.title}</Styles.SurveyTitle>
						<Styles.SurveyType>{mockSurvey.type} Survey</Styles.SurveyType>
						<Image
							onClick={() => {}}
							src={'/assets/drop.svg'}
							alt=''
							width={18}
							height={18}
						/>
					</Styles.SurveyHeader>
					<Styles.SurveyStats>
						<Styles.StatItem>Reward: {mockSurvey.reward} SOL</Styles.StatItem>
						<Styles.StatItem>
							Max Responses: {mockSurvey.maxResponses}
						</Styles.StatItem>
						<Styles.StatItem>
							Current Responses: {responses.filter(Boolean).length}
						</Styles.StatItem>
					</Styles.SurveyStats>
				</Styles.SurveyLeftside>
			</Styles.DetailContainer>
		</div>
	);
};

export default SurveyDetailPage;
