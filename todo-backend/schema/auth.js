const z = require('zod')

const normalLoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    type: z.literal('normal'),
    accountName: z.string().max(100, 'Max limit exceeded')
});

const googleSignUpSchema = z.object({
    type: z.literal('googleSignUp')
});

const googleSignInSchema = z.object({
    type: z.literal('googleSignIn')
});

const authSchema = z.discriminatedUnion('type', [
    normalLoginSchema,
    googleSignUpSchema,
    googleSignInSchema
]);

module.exports = { authSchema }