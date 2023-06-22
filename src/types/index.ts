export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  displayName: string;
};

export type LoginResponseType = {
  data: {
    user: User;
    access_token: string;
  };
};

export type SignupResponseType = {
  data: {
    id: string;
    email: string;
    userName: string;
    isVerified: boolean;
  };
};

export type AuthState = {
  status: string;
  data: {
    access_token: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      displayName: string;
    };
  };
  httpError: any;
  isLoggedIn: boolean;
};

export type UrlType = {
  id: string;
  title: string;
  shortUrl: string;
  longUrl: string;
  isActive?: boolean;
  updatedAt: string;
};