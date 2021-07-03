import React, { useState } from 'react';
import { useGlobalContext } from '../context';
import { showDate, userFullName } from '../utils';
import { IUser, ICompany } from '../models';
import { MALE_GENDER } from '../assets/constants';

export default function UserView({ user }: { user: IUser }) {
    const { companies } = useGlobalContext();
    const { gender, birthday, avatar, company_id } = user;
    const userCompany: ICompany | undefined = company_id
        ? companies.find(({ id }) => id === company_id)
        : undefined;
    const [detailsVisibility, setDetailsVisibility] = useState<Boolean>(false);

    const toggleDetails = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDetailsVisibility(visibility => !visibility);
    };

    return (
        <React.Fragment>
            <a href="#" onClick={toggleDetails}>
                {gender === MALE_GENDER ? 'Mr' : 'Ms'}. {userFullName(user)}
            </a>
            <div className="user-details" style={{ display: detailsVisibility ? 'block' : 'none' }}>
                <p>Birthday: {birthday ? showDate(birthday, true) : '-'}</p>
                {avatar && (
                    <p>
                        <img src={avatar} width="100px" alt="avatar" />
                    </p>
                )}
                {userCompany && (
                    <React.Fragment>
                        <p>
                            Company:{' '}
                            {userCompany.url ? (
                                <a href={userCompany.url} target="_blank">
                                    {userCompany.title}
                                </a>
                            ) : (
                                userCompany.title
                            )}
                        </p>
                        <p>
                            Industry: {userCompany.industry} / {userCompany.sector}
                        </p>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    );
}
