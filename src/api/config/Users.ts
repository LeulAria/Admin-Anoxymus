import { Service } from "./Service";

// types
export interface SigninWithFirebasePayload {
  credential: Credential;
}

export interface Credential {
  loginMethod:     string;
  firebaseIdToken: string;
}

export interface User {
	token:       string;
	newUser:     boolean;
	instance:    Instance;
	loginMethod: string;
}

export interface Instance {
	createdAt:                string;
	modifiedAt:               string;
	id:                       string;
	firebaseUserId:           string;
	displayName:              string;
	phone:                    string;
	email:                    string;
	emailVerified:            boolean;
	role:                     string;
	isBanned:                 boolean;
	isInvited:                boolean;
	enablePromotionsEmail:    boolean;
	enableNewsAndUpdateEmail: boolean;
	enableDiscountsEmail:     boolean;
	enableRemindersEmail:     boolean;
	enablePromotionsSms:      boolean;
	enableNewsAndUpdateSms:   boolean;
	enableDiscountsSms:       boolean;
	enableRemindersSms:       boolean;
	birthDate:                null;
	invitationId:             null;
	profilePhotoUrl:          null;
	telegramName:             string;
	telegramId:               string;
	telegramUsername:         string;
}


const route = '/users';

export default {
  signInWithFirebase: () => new Service<User, SigninWithFirebasePayload>(`${route}/signIn/firebase`, "POST")
}