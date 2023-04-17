export interface User {
	id: string;
	bacgroundPicture?: string;
	profilePicture?: string;
	dummy?: boolean;
	friends: [];
	groups: [];
	intrests: [];
	liked: [];
	messages: [];
	posts: [];
	pictures: [];
	about: {
		adress?: string;
		city?: string;
		college?: string;
		highSchool?: string;
		hometwon?: string;
		relationship?:
			| 'single'
			| 'in a relationship'
			| 'engaged'
			| 'married'
			| "it's complicated"
			| 'open relationship'
			| 'widowed'
			| 'separated'
			| 'divorced'
			| 'in a civil union'
			| 'in a domestic partnership';
		workplace?: string;
	};
}
