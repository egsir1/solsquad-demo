// app/onboard/page.tsx
"use client";

import { useState, useRef } from "react";
import * as Styles from "./style";

// Types
interface FormData {
  name: string;
  email?: string;
  bio?: string;
  firstName: string;
  lastName?: string;
}

const OnboardPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    bio: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<{ name?: string }>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && value.trim()) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };



  const validateForm = () => {
    const newErrors: { name?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Add your API or blockchain logic here (e.g., save to Solana)
      alert("Profile updated successfully!");
    }
  };

  return (
    <Styles.OnboardContainer>
      <Styles.FormCard>
        <Styles.Title>Create Your Profile</Styles.Title>
        <Styles.Form onSubmit={handleSubmit}>
          <Styles.FlexRow>
            <Styles.FormGroup>
              <Styles.Label htmlFor="firstName">
                First Name *
              </Styles.Label>
              <Styles.Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </Styles.FormGroup>
            <Styles.FormGroup>
              <Styles.Label htmlFor="lastName">
                Last Name (Optional)
              </Styles.Label>
              <Styles.Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </Styles.FormGroup>
          </Styles.FlexRow>

          <Styles.FlexRow>
            <Styles.FormGroup>
              <Styles.Label htmlFor="email">Email (Optional)</Styles.Label>
              <Styles.Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Styles.FormGroup>
          </Styles.FlexRow>

          <Styles.FormGroup>
            <Styles.Label htmlFor="bio">Bio (Optional)</Styles.Label>
            <Styles.TextArea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </Styles.FormGroup>

          <Styles.SubmitButton type="submit" disabled={!formData.name.trim()}>
            Save Profile
          </Styles.SubmitButton>
        </Styles.Form>
      </Styles.FormCard>
    </Styles.OnboardContainer>
  );
};

export default OnboardPage;
