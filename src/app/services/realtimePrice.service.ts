import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {MktSymbol} from '../models/mktsymbol';
import {SysData} from '../models/sysData';
import {SecMasterService} from './secMaster.service';

@Injectable({
    providedIn: 'root'
})
export class RealtimePriceService {
    private hubConnection: signalR.HubConnection;
    private dataDictionary = new BehaviorSubject<Record<string, any>>({});
    public realTimeSymbols: MktSymbol[];
    private sysDataArray: SysData[]
    private initialized = false;
    private sysDataInitialized = false;

    constructor(secMasterService: SecMasterService) {
        // load the list of symbols into realTimeSymbols
        secMasterService.getRealTimeSymbols().subscribe(symbols => {
            this.realTimeSymbols = symbols;

            // for each symbol, add a key value to dataDictionary
            this.realTimeSymbols.forEach(symbol => {
                this.dataDictionary.getValue()[symbol.symbol] = null;
            });
        });
    }


    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.priceHubUrl)
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('DCD: Error while starting connection: ' + err))
    }

    public addDataListener = () => {
        this.hubConnection.on('ReceiveData', (data) => {
            this.updateDataDictionary(data);
        });
    }

    private updateDataDictionary = (dataString: any) => {
        this.dataDictionary.next(dataString);
    }

    public getDataDictionary = () => {
        return this.dataDictionary.asObservable();
    }
}


