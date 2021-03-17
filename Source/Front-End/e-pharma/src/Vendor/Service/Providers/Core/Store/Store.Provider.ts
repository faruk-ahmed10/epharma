/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import {EventEmitter} from 'events';

export class StoreProvider extends EventEmitter {
    public CHANGE: string = "CHANGE";
    public state: any;

    public constructor() {
        super();
        this.state = {};

        this.registerDispatcher();
    }

    public addChangeListener(callback: () => void): void {
        this.on(this.CHANGE, callback);
    }

    public removeChangeListener(callback: () => void): void {
        this.removeListener(this.CHANGE, callback);
    }

    public emitChange(): void {
        this.emit(this.CHANGE);
    }

    public getState(): any {
        return this.state;
    }

    public registerDispatcher(): void {
    }
}