import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    private readonly _user = new BehaviorSubject<User | null>(null);
    readonly user$ = this._user.asObservable();

    constructor() { }

    get user(): any {
        return this.user$;
    }

    set user(val: User | null) {
        this._user.next(val);
    }
}