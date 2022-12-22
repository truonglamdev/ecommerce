import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import classNames from 'classnames/bind';
import styles from './CheckoutSteps.module.scss';

const cx = classNames.bind(styles);
function CheckoutSteps({ activeStep }) {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <Stepper activeStep={activeStep} style={{ boxSizing: 'border-box', width: '100%' }}>
                {steps.map((step, index) => (
                    <Step key={index} active={activeStep === index ? true : false} className={cx('step')}>
                        <StepLabel
                            className={cx('step-item')}
                            style={{
                                color: activeStep >= index ? 'tomato' : 'rgba(0, 0, 0, 0.649)',
                                fontSize: 30,
                            }}
                            icon={step.icon}
                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}

export default CheckoutSteps;
