import { Tedis } from 'tedis'
import { TedisException } from './Exceptions'
import { ICache } from './../../Application/Shared'


export default class RedisCache implements ICache
{
    private _tedis? : Tedis

    constructor(private _host : string, private _port : number)
    {
        //
    }

    connect()
    {
        this._tedis = new Tedis({
            port: this._port,
            host: this._host
        })
    }

    close()
    {
        if(!this._tedis)
        {
            throw new TedisException('Cache client is undefined')
        }
        this._tedis.close()
    }

    async deleteKey(key : string)
    {
        if(!this._tedis)
        {
            this.connect()
        }
        return await this._tedis!.del(key) ? true : false
    }

    async existKey(key : string)
    {
        if(!this._tedis)
        {
            this.connect()
        }
        return await this._tedis!.exists(key) ? true : false
    }

    async expireKey(key : string, seconds : number)
    {
        if(!this._tedis)
        {
            this.connect()
        }
        return await this._tedis!.expire(key, seconds) ? true : false
    }

    async getAllKeys()
    {
        if(!this._tedis)
        {
            this.connect()
        }
        return this._tedis!.keys('*')
    }

    async pushInList(key : string, value : string)
    {
        if(!this._tedis)
        {
            this.connect()
        }
        return await this._tedis!.rpush(key, value) ? true : false
    }
}