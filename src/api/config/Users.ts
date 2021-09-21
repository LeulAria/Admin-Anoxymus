import { Service } from "./Service";

// types
export interface SigninWithFirebasePayload {
	credential: Credential;
}

export interface Credential {
	loginMethod?: string;
	firebaseIdToken?: string;
}

export interface User {
	token: string;
	newUser: boolean;
	instance: Instance;
	loginMethod: string;
}

export interface Instance {
	createdAt: string;
	modifiedAt: string;
	id: string;
	firebaseUserId: string;
	displayName: string;
	phone: string;
	email: string;
	emailVerified: boolean;
	role: string;
	isBanned: boolean;
	isInvited: boolean;
	enablePromotionsEmail: boolean;
	enableNewsAndUpdateEmail: boolean;
	enableDiscountsEmail: boolean;
	enableRemindersEmail: boolean;
	enablePromotionsSms: boolean;
	enableNewsAndUpdateSms: boolean;
	enableDiscountsSms: boolean;
	enableRemindersSms: boolean;
	birthDate: null;
	invitationId: null;
	profilePhotoUrl: null;
	telegramName: string;
	telegramId: string;
	telegramUsername: string;
}


export interface UserPost {
	createdAt?: string;
	modifiedAt?: string;
	id?: string;
	firebaseUserId?: string;
	displayName: string;
	phone?: string;
	email: string;
	emailVerified?: boolean;
	role?: string;
	isBanned?: boolean;
	isInvited?: boolean;
	enablePromotionsEmail?: boolean;
	enableNewsAndUpdateEmail?: boolean;
	enableDiscountsEmail?: boolean;
	enableRemindersEmail?: boolean;
	enablePromotionsSms?: boolean;
	enableNewsAndUpdateSms?: boolean;
	enableDiscountsSms?: boolean;
	enableRemindersSms?: boolean;
	birthDate?: string;
	invitationId?: string;
	profilePhotoUrl?: string;
	additionalProp1?: any;
}


const route = '/users';

export default {
	getUsersCount: () => new Service<number, unknown>(`${route}/count`, "GET"),
	getUsers: () => new Service<User[], SigninWithFirebasePayload>(`${route}`, "GET"),
	signInWithFirebase: () => new Service<User, SigninWithFirebasePayload>(`${route}/signIn/firebase`, "POST"),
	createUser: () => new Service<any, UserPost>(`${route}`, "POST"),
	updateUser: (id: string) => new Service<any, UserPost>(`${route}/${id}`, "PUT"),
	deleteUser: (id: string) => new Service<unknown, unknown>(`${route}/${id}`, "DELETE"),
}