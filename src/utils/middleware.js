import connectDB from '../services/connection';
connectDB();
export function middleware(req) {
    return Response.next();
}