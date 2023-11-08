export enum PasswordStrength {
  TooWeak = 'too weak!',
  Weak = 'weak',
  Medium = 'medium',
  Strong = 'strong',
}

export type CharacterType = 'uppercase' | 'lowercase' | 'number' | 'symbol';

export interface IncludeOption {
  title: string;
  type: CharacterType;
}
