"use client"

import React,{ useEffect,useState} from 'react';
import styles from "./CountdownTimer.module.scss"

interface CountdownTimerProps {
    deadline: Date;
    title: string;
}

interface CountdownTimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

const INITIAL_TIME_LEFT: CountdownTimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
}

function CountdownTimer({ deadline,title }: CountdownTimerProps) {
    const [timeLeft,setTimeLeft] = useState<CountdownTimeLeft>(INITIAL_TIME_LEFT);

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        },1000)

        return () => clearInterval(timer);
    })

    function calculateTimeLeft() : CountdownTimeLeft {
        let timeLeft: CountdownTimeLeft = {};
        const currentDate = new Date();
        const differece = deadline.getTime() - currentDate.getTime();

        if(differece > 0) {
            timeLeft = {
                days: Math.floor(differece / (1000 * 60 * 60 * 24)),
                hours: Math.floor(differece / (1000 * 60 * 60) % 24),
                minutes: Math.floor(differece / (1000 * 60) % 60),
                seconds: Math.floor(differece / 1000 % 60)
            }
        }

        return timeLeft;
    }
    return(
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.timeWrapper}>
                {
                    Object.entries(timeLeft).map(([unit,value]) => (
                        <div key={unit} className={styles.timeContainer}>
                            <p className={styles.value}>{value}</p><p className={styles.unit}>{unit}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default CountdownTimer;