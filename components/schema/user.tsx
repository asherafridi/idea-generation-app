import { ZodError, z } from 'zod';

export function UserRegisterSchema(data: object) {
    const schema = z.object({
        name: z.string().min(2).max(30),
        email: z.string().email(),
        password: z.string().min(8).max(30)
    });

    const result = schema.safeParse(data);

    if (result.success) {
        return undefined;
    } else {
        const error: ZodError<any> = result.error;
        const msg = error.errors.reduce((acc:any, curr:any) => {
            acc[curr.path[0]] = curr.message;
            return acc;
        }, {});
        return msg;
    }
}

export function UserLoginSchema(data: object) {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(30)
    });

    const result = schema.safeParse(data);

    if (result.success) {
        return undefined;
    } else {
        const error: ZodError<any> = result.error;
        const msg = error.errors.reduce((acc:any, curr:any) => {
            acc[curr.path[0]] = curr.message;
            return acc;
        }, {});
        return msg;
    }
}