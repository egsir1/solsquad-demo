import React from 'react';
import {
	Avatar,
	AvatarNote,
	Button,
	ButtonRow,
	Container,
	Field,
	Hint,
	Input,
	Label,
	Left,
	Right,
	Row,
	Select,
	TextArea,
} from './style';

const ProfilePage = () => {
	return (
		<Container>
			<Left>
				<Row>
					<Field>
						<Label>Email</Label>
						<Input disabled value='egsir111@gmail.com' />
					</Field>
				</Row>
				<Row>
					<Field>
						<Label>First Name</Label>
						<Input value='SIROJIDDIN' />
					</Field>
					<Field>
						<Label>Last Name</Label>
						<Input value='EGAMBERDIEV' />
					</Field>
				</Row>
				<Row>
					<Field>
						<Label>Date of Birth</Label>
						<Input placeholder='Enter in format MM/DD/YYYY' />
					</Field>
					<Field>
						<Label>Gender</Label>
						<Select defaultValue='Other'>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
							<option value='Other'>Other</option>
						</Select>
					</Field>
				</Row>
				<Row>
					<Field>
						<Label>Country</Label>
						<Input placeholder='Please, select country' />
					</Field>
					<Field>
						<Label>City</Label>
						<Input placeholder='Your city' />
					</Field>
				</Row>
				<Field>
					<Label>Bio</Label>
					<TextArea placeholder='Profile Bio' />
				</Field>
				<ButtonRow>
					<Button>Update Profile</Button>
					<Button>Verify KYC</Button>
					<Button>Verify Email</Button>
					<Button>Web3 Mail</Button>
				</ButtonRow>
			</Left>

			<Right>
				<Avatar>E</Avatar>
				<AvatarNote>
					<strong>User photo</strong>
					<br />
					We recommend an image of at least 400×400.
				</AvatarNote>
			</Right>
		</Container>
	);
};

export default ProfilePage;
