import request from './httpRequest';
const paymentProcess = async (paymentData) => {
    const config = {
        'Content-Type': 'application/json',
    };
    const res = await request.post('/payment/process', paymentData, config);

    return res;
};

export default paymentProcess;
