"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakePayment = void 0;
const MakePayment = (req, res) => {
    try {
        const id = req.user.id;
    }
    catch (err) {
        return res.status(500).json({
            Error: 'Internal server error',
            Route: '/payment/create',
        });
    }
};
exports.MakePayment = MakePayment;
