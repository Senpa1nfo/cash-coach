const UserService = require('../service/user-service');
const AddService = require('../service/add-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка під час валідації', errors.array()));
            }
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password); 
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password); 
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            next(error);
        }
    }

    async sendLink(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken); 

            const email = userData.user.email;
            const activationLink = userData.user.activationLink;

            await UserService.sendLink(email ,activationLink);
        } catch (error) {
            next(error);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken); 
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async users(req, res, next) {
        try {
            const users = await UserService.getAllUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async add(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken); 
            const user_id = userData.user.id;
            const {description, value, bool} = req.body;

            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            const day = new Date().getDate();
            const hours = new Date().getHours();
            const minutes = new Date().getMinutes();
            const date = `${day}/${month + 1}/${year} ${hours}:${minutes}`;
            const timeAdded = new Date();

            const item = await AddService.add(user_id, description, value, bool, date, timeAdded); 
            return res.json(item);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken); 
            const user_id = userData.user.id;
            const {_id} = req.body;
            
            const item = await AddService.delete(_id, user_id); 
            return res.json(item);
        } catch (error) {
            next(error);
        }
    }

    async edit(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken); 
            const user_id = userData.user.id;
            const {_id, description, value, bool} = req.body;
            
            const item = await AddService.edit(_id, user_id, description, value, bool); 
            return res.json(item);
        } catch (error) {
            next(error);
        }
    }

    async generate_list(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken); 
            const user_id = userData.user.id;
            
            const item = await AddService.get(user_id); 
            return res.json(item);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();