import gql from "graphql-tag";

const USER_WANTS_REMINDERS_FLAG = gql`
  mutation($email: String!, $wantsReminders: Boolean!) {
    updateUserWantsRemindersFlag(
      email: $email
      wantsReminders: $wantsReminders
    ) {
      userRecord {
        id
        wantsReminders
      }
    }
  }
`;

export default USER_WANTS_REMINDERS_FLAG;
