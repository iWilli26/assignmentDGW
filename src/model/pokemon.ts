export type Pokemon = {
    abilities: Ability[];
    base_experience: number;
    height: number;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    name: string;
    order: number;
    past_types: any[];
    sprites: Sprites;
    types: Type[];
    weight: number;
};

export type Ability = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
};

export type Sprites = {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
};

export type Type = {
    slot: number;
    type: {
        name: string;
        url: string;
    };
};
