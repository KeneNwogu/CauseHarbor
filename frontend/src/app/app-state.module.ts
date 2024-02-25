import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User{
    profile: {
        _id: string,
        name: string,
        email: string,
        role: "organization" | "donor",
        verified: boolean
    }

    organization?: {
        missionStatement: string,
        organizationLogo: string,
        organizationGoals: string[],
        introductionVideo: string | null,
        profile: string,
        totalDonationsReceived: number,
        verified: boolean,
        _id: string
    }

    token: string
}

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    private readonly _user: BehaviorSubject<User | null>;
    // readonly user$ = this._user.asObservable();

    constructor() { 
        const initialState = JSON.parse(localStorage.getItem('cause-harbour:user') || 'null') || null;
        this._user = new BehaviorSubject<any>(initialState)
    }

    get user(): any {
        return this._user.asObservable();
    }

    set user(val: User | null) {
        this._user.next(val);
        localStorage.setItem('cause-harbour:user', JSON.stringify(val));
    }
}