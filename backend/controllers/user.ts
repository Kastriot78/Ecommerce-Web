import User from '../models/User';
import { getToken, sendAccountApproved } from '../util';
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { sendSignUpFromUserEmail } from '../util';

export const users = async (req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ _id: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error(`Useri me emailin ${email} nuk ekziston!`);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Fjalëkalimi gabim!");
        }

        if (!user?.approved) {
            throw new Error(`Llogaria juaj nuk është aprovuar nga admini!`);
        }

        res.status(200).send({
            _id: user.id,
            name: user.name,
            lastName: user.lastName,
            password: user.password,
            email: user.email,
            company: user.company,
            phone: user.phone,
            isAdmin: user.isAdmin,
            role: user.role,
            approved: user.approved,
            token: getToken(user),
            success: true
        });
    } catch (error) {
        if (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};

export const register = async (req: Request, res: Response) => {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
        return res.status(400).json({ error: `Useri me emailin ${req.body.email} ekziston` });
    }
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        company: req.body.company ? req.body.company : '',
        phone: req.body.phone ? req.body.phone : '',
        password: req.body.password,
        isAdmin: req.body?.isAdmin ? JSON.parse(req.body.isAdmin) : false,
        approved: req?.body?.approved ? true : false,
        createdAt: new Date().toISOString()
    });

    try {
        await user.save();
        sendSignUpFromUserEmail(user);
        res.send({
            _id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            success: true,
            token: getToken(user)
        })
    } catch (error) {
        console.log(error);
        if (error) {
            return res.status(400).json({
                title: "error",
                error: error,
            });
        }
    }
};

export const approveAccount = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user) {
            user.approved = true;
            const updatedUser = await user.save();
            if (updatedUser) {
                console.log(user.email);
                sendAccountApproved(user);
                return res.status(200).send({ msg: 'User Account Approved.', user: updatedUser, success: true });
            } else {
                console.log('error');
                return res.status(500).send({ msg: 'Error in Approving User Account.' })
            }
        } else {
            return res.status(404).send({ msg: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user) {
            return res.status(200).send({ user: user });
        } else {
            return res.status(404).send({ msg: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

export const editUser = async (req: any, res: Response) => {
    const { name, lastName, email, company, phone, role } = req.body;
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user) {
            user.name = name ? name : user.name;
            user.lastName = lastName ? lastName : user.lastName;
            user.email = email === user.email ? user.email : email;
            user.company = company ? company : user.company;
            user.phone = phone ? phone : user.phone;
            user.role = role ? role : user.role;

            const updatedUser = await user.save();
            if (updatedUser) {
                return res.status(200).send({ msg: 'User Updated.', user: updatedUser, token: getToken(user), success: true });
            } else {
                console.log('error');
                return res.status(500).send({ msg: 'Error in Updating User.' })
            }
        }
    } catch (e) {
        res.send({ error: e.message });
    }
}

export const editPassword = async (req: Request, res: Response) => {
    const { password } = req.body;

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user) {
            user.password = password ? password : user.password;
        }

        const updatedUser = await user.save();
        if (updatedUser) {
            return res.status(200).send({ msg: 'User Password Updated.', user: updatedUser, success: true });
        } else {
            console.log('error');
            return res.status(500).send({ msg: 'Error in Updating User Password.' })
        }
    } catch (e) {
        console.log('error');
        res.send({ error: e.message });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (user) {
        const deletedUser = await user.remove();
        res.status(200).send({ msg: 'Përdoruesi u fshi me sukses.', data: deletedUser });
    } else {
        res.status(500).send({ msg: 'Something went wrong.Try again.' })
    }
};