import {Deserializable} from './deserializable.model';


export class Movies implements Deserializable {
	id: string;
	name: string;
	genre: string;
	score: string;
	cover: string;


	deserialize(input: any): this {
		Object.assign(this, input);

		return this;
		}
}