import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-kakao";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.OAUTH_KAKAO_KEY,
      callbackURL: process.env.OAUTH_KAKAO_REDIRECT
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      provider: 'kakao',
      providerId: profile.id,
      name: profile.displayName,
      email: profile._json.kakao_account.email
    };
  }
}
