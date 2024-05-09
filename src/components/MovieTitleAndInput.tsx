import { ChangeEventHandler, FC } from "react";

import { MovieModel } from "../models/movie.model";
import Button from "./Button";

export interface MovieTitleAndInputProps {
  inputValue: string;
  movie: MovieModel;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  selectedMovieId?: number;
  onRename: () => void;
}

const MovieTitleAndInput: FC<MovieTitleAndInputProps> = ({
  inputValue,
  onChange,
  onRename,
  movie,
  selectedMovieId,
}) => {
  return movie.id === selectedMovieId ? (
    <div className="d-flex gap-2">
      <input
        type="text"
        className="form-control"
        onChange={onChange}
        defaultValue={inputValue}
      />
      <Button
        className="btn btn-primary"
        disabled={!inputValue.length}
        clickHandler={onRename}
      >
        Save
      </Button>
    </div>
  ) : (
    <>{movie.title}</>
  );
};

export default MovieTitleAndInput;
