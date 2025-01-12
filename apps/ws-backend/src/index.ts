import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
    try {
        
        const url = request.url;
        if (!url) {
            ws.close(4001, 'Missing URL');
            return;
        }

        // Extract query parameters
        const queryParams = new URLSearchParams(url.split('?')[1]);
        const token = queryParams.get('token');
        if (!token) {
            ws.close(4002, 'Missing token');
            return;
        }

        // Verify JWT
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            ws.close(4003, 'Server misconfiguration');
            return;
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, jwtSecret);
        } catch (error) {
            console.error('Invalid token:', error);
            ws.close(4004, 'Invalid token');
            return;
        }

       
        if (!decodedToken || !(decodedToken as JwtPayload).userId || typeof(decodedToken) === 'string') {
            ws.close(4005, 'Invalid token payload');
            return;
        }

        
        console.log(`User connected: ${decodedToken}`);

        // Handle WebSocket messages
        ws.on('message', function message(data) {
            console.log(`Received message: ${data}`);
            ws.send('pong');
        });

        // Handle connection closure
        ws.on('close', () => {
            console.log(`Connection closed for user: ${decodedToken.userId}`);
        });

    } catch (error) {
        console.error('Error during WebSocket connection:', error);
        ws.close(1011, 'Internal server error');
    }
});
