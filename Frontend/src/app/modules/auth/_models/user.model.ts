import { AuthModel } from "./auth.model";

export class UserModel extends AuthModel {
	id: number;
	username: string;
	firstname: string;
	lastname: string;
	tel: string;
	address: string;
	email: string;


	setUser(user: any) {
		this.id = user.id;
		this.username = user.username || '';
		this.firstname = user.firstname || '';
		this.lastname = user.lastname || '';
		this.address = user.address || '';
		this.email = user.email || '';
		this.tel = user.tel || '';
	}
}