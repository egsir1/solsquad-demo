import SurveyForm from "./form";
import * as Styles from "./styles";

export const CreateSurvey = () => {
  return (
    <Styles.Container>
      <Styles.Header>
        <h1>Create Survey</h1>
        <Styles.SubmitButton type="submit">Submit The Survey</Styles.SubmitButton>
      </Styles.Header>
      <div>
        <SurveyForm onSubmit={() => {}} />
      </div>
    </Styles.Container>
  );
};
