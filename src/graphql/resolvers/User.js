import User from "../../models/User";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import validator from 'validator';
import ValidationError from '../ValidationError';
import {generateError} from '../helpers/ValidateErrorResponse';

import dotenv from "dotenv";

dotenv.config();

export default {
    Query: {
        user: async (root, args) => {
            const user = await User.findOne(args);
            if(!user){
                throw new Error('no user matched');
            }
            return user;
        },
        users: async () => {
            const users = await User.find({}).select("-password");
            return users;
        },
        currentUser: async (root, args, {user}) => {
            if (!user) {
                throw new ValidationError([{
                    key: 'user',
                    message: 'user_not_authenticated',
                }])
            }
            const currentUser = await User.findById(user._id);
            return currentUser;
        }
    },
    Mutation: {
        addUser: async (root, {firstName, lastName, email, role, password}) => {
            let fieldErrors = {};

            if (validator.isEmpty(firstName)) {
                generateError(fieldErrors, 'firstName', firstName, 'is_empty');
            }

            if (validator.isEmpty(lastName)) {
                generateError(fieldErrors, 'lastName', lastName, 'is_empty');
            }

            if (!validator.isEmail(email)) {
                generateError(fieldErrors, 'email', email);
            }

            if (!validator.isLength(password, {min: 6, max: 20})) {
                generateError(fieldErrors, 'password', password);
            }

            if (Object.keys(fieldErrors).length) {
                throw new ValidationError(fieldErrors);
            }

            const newUser = await new User({
                firstName,
                lastName,
                email,
                role,
                password: await bcrypt.hash(password, 10)
            });
            if (!newUser) {
                throw new Error(`Cannot create user ${email}`)
            }
            let savedUser = null;
            try {
                savedUser = await newUser.save();
            } catch (e) {
                if (e.code === 11000) {
                    generateError(fieldErrors, 'email', 'exists')
                    throw new ValidationError(fieldErrors);
                }
                throw new Error(`Cannot create user ${email}`)
            }
            return jsonwebtoken.sign(
                {
                    _id: savedUser._id,
                    email: savedUser.email,
                    roles: savedUser.roles,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )

        },
        login: async (root, {email, password}) => {
            const user = await User.findOne({email});
            let fieldErrors = {};
            if (!user) {
                generateError(fieldErrors, 'email', email, 'does_not_exist');
                throw new ValidationError(fieldErrors);
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                generateError(fieldErrors, 'password', password, 'incorrect');
                throw new ValidationError(fieldErrors);
            }

            return jsonwebtoken.sign(
                {
                    _id: user._id,
                    email: user.email,
                    roles: user.roles,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )
        },
        deleteUser: (root, {_id}) => {
            return new Promise((resolve, reject) => {
                User.findByIdAndRemove({_id}).exec((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        },
        editUser: async (root, {_id, firstName, lastName, password, roles}, {user}) => {
            if (!user) {
                throw new Error("User is not authenticated");
            }
            const response = await User.findByIdAndUpdate({_id}, {
                $set: {
                    firstName,
                    lastName,
                    password,
                    roles,
                }
            }, {new: true}).exec();
            if (!response) {
                throw new Error(`Cannot save user: ${_id}`);
            }
            return response;
        }
    }
}
