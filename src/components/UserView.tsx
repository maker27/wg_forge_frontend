import React, { useState } from 'react';
import { useGlobalContext } from '../context';
import { showDate } from '../utils';
import { IUser } from '../models/user';
import { ICompany } from '../models/company';

export default function UserView({
    user: { first_name, last_name, gender, birthday, avatar, company_id }
}: {
    user: IUser;
}) {
    const { companies } = useGlobalContext();
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
                {gender === 'Male' ? 'Mr' : 'Ms'}. {first_name} {last_name}
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
