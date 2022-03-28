import {ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min} from 'class-validator';

export class MakeGameMoveDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(8)
    public index: number;
    @IsString()
    public sign: string;
}