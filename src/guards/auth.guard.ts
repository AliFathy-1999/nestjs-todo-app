import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from '../config/index';
const { jwtConstants } = config
import { Request } from 'express';
import { UsersRepository } from '../users/users.repository';

@Injectable()
    export class AuthGuard implements CanActivate {
        constructor(private jwtService: JwtService, private usersRepository: UsersRepository) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const token = this.extractTokenFromHeader(request);
        
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
            const user = await this.usersRepository.findOne(payload.userId)
            
            request.user = user;
            
        } catch {
            throw new UnauthorizedException();
        }
            return true;
    }
    
    private extractTokenFromHeader(request: Request): string | undefined {
            const [type, token] = request.headers.authorization?.split(' ') ?? [];
            return type === 'Bearer' ? token : undefined;
        }
}