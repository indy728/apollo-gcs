import { Response } from "express";
import { sign } from 'jsonwebtoken';

export const createAccessToken = ({ username }: { username: string }) => {
  const accessToken = sign({ username }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
  return accessToken;
}

export const createRefreshToken = ({ username }: { username: string }) => {
  const accessToken = sign({ username }, process.env.REFRESH_SECRET!, { expiresIn: "7d" })
  return accessToken;
}

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('meatid', token, {
    httpOnly: true,
    path: '/refresh_token',
    sameSite: false
  })
}

// @TODO: invalidate old refresh tokens