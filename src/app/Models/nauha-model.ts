import { Location } from './location-model';

export enum enumContentType
{
    Static = 0,
    Live = 1
}
export interface IContentType
{
    id?:number,
    name?:string
}
export interface IVideo
{
    id?:number,
    title?:string,
    description?:string,
    embedUrl?:string,
    channelName?:string,
    contentType?:number,
    contentTyeName?:string,
    approved?:boolean,
    tags?:string,
    rank?:number
}

export interface ILocationGroup
{
    id?:number,
    name?:string,
    locations?: ILocation[]
}

export interface ILocation
{
    locationId?: number,
    locationName?: string,
    locationGroupId?: number,
    nauhaCount?:number
}

export interface INauha
{
    id?: number,
    title?: string,
    lyricist?: string,
    orator?: string,
    url?: string,
    fileBinaries?: any,
    approved?: boolean,
    year?: Date,
    locationDto?:ILocation,
    description?: string
}
export class Nauha{
    constructor
    (
       
        public name: string,
        public lyricist: string,
        public orator: string,
        public title: string,
        public url: string,
        public locationId?: number,
        public locationName?: string,
        public description?:string,
        public year?: number,
        public fileBinaries?: any     ,
        public approved?: boolean,
        public id?:number
    ){   }
}

