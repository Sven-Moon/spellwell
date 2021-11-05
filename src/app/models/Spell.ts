export interface Spell {
  index: string,
  name: string,
  url: string,
	desc?: string[],
	higher_level?: string[],
	range?: string,
	components?: string[],
	material?: string,
	ritual?: boolean,
	duration?: string,
	concentration?: false,
	casting_time?: string,
	level?: number,
	damage?: Damage,
	dc?: DC,
	area_of_effect?: {
		type: string,
		size: number
	},
	school?: BaseDesc,
	classes?: Classes,
	subclasses?: Subclasses

}

export type Spells = Spell[]

export interface BaseDesc {
  index: string,
  name: string,
  url: string
}

export interface DC {
		dc_type: BaseDesc,
		dc_success: string
	}

export interface ClassDD extends BaseDesc {

}
export type Classes = ClassDD[]

export interface SubclassDD  {
  name: string,
  url: string
}
export type Subclasses = ClassDD[]


export interface School extends BaseDesc {

}

export interface Damage {
  damage_type: BaseDesc,
  damage_at_character_level?: {
    1: string,
    5: string,
    11: string,
    17: string
  }
  damage_at_slot_level?: {
    2: string,
    3: string,
    4: string,
    5: string,
    6: string,
    7: string,
    8: string,
    9: string
  }
}
