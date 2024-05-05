import  { IUser,Payload }  from '../interfaces/user.interface';

declare global{
    namespace Express {
        interface Request {
            user?: Payload | undefined,
        }
    }
    
}