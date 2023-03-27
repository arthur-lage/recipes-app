import { Request, Response } from "express";
import { z } from "zod";
import { UserModel } from "../models/User";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

const userController = {
  async register(req: Request, res: Response) {
    const registerBody = z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const { username, email, password } = registerBody.parse(req.body);

    try {
      const userExists = await UserModel.findOne({
        $or: [{ email }, { username }],
      });

      if (userExists) {
        return res.status(400).json({
          message: "This user already exists.",
        });
      }

      const hashedPassword = await argon2.hash(password);

      const user = new UserModel({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign(
        {
          id: user._id,
        },
        String(process.env.JWT_SECRET)
      );

      return res.status(201).json({
        token,
        userId: user._id,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const loginBody = z.object({
        email: z.string().email(),
        password: z.string(),
      });

      const { email, password } = loginBody.parse(req.body);

      const user = await UserModel.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      const passwordsMatch = await argon2.verify(user.password, password);

      if (!passwordsMatch) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        String(process.env.JWT_SECRET)
      );

      return res.status(200).json({
        token,
        userId: user._id,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export { userController };
