import * as Validator from 'class-validator';

export class TravelComponentDto{
    countryId : number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.IsIn(["starting_point", "destination", "transit"])
    type : 'starting_point' | 'destination' | 'transit'
}