/* Files in the models folder should always end in .model.ts
   The interface should also contain the "Model" postfix.
*/
export interface MovieModel {
  id: number;
  title: string;
  year: number;
  rating: number;
  thumbnail: string;
}
