/* Hiararchy, see App.tsx */
import { ChangeEvent, FC, useState } from "react";
import classNames from "classnames";

import Page from "../components/Page";
/* Instead of a function that returns a component, I've created it's own component, let's slice up the code,
 into smaller building block, when we can. */
import MovieTitleAndInput from "../components/MovieTitleAndInput";
import SortingSelector from "../components/SortingSelector";
import TableAction from "../components/TableAction";
import {
  SortBy,
  SortDataModel,
  SortDirection,
} from "../models/sortingData.model";
import { MOVIES } from "../data/movies";

import styles from "./Movies.module.css";
/* Screaming snake case for variables outside component. */
const DEFAULT_SORT_DATA: SortDataModel = {
  direction: SortDirection.DESC,
  sortBy: SortBy.RATING,
};
/* Since it's not dependant on anything, let's move it outside */
const TABLE_COLUMNS = ["Title", "Year", "Rating", "Thumbnail", ""];

const Movies: FC = () => {
  const [movies, setMovies] = useState(MOVIES);
  const [inputValue, setInputValue] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number>();
  const [sortData, setSortData] = useState<SortDataModel>(DEFAULT_SORT_DATA);

  /* Let's change this to an arrow function, also setting the return type is unnecesarry,
  also renamed the prop, let's since we have a state variable with the same name. */
  const setMoviesOrder = (movieSortData: SortDataModel) => {
    setSortData(() => movieSortData);
    /* In React we generally tend to avoid switch case statements, so I replaced it with an object,
    if you are interested here is a good article, that explains what is the problem with switch case
    https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals
    */
    const sortedMovieList = MOVIES.toSorted((a, b) => {
      const sorting = {
        [SortBy.ALPHABETICAL]: () => {
          if (a.title.toUpperCase() === b.title.toUpperCase()) {
            return 0;
          }

          return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
        },
        [SortBy.RATING]: () => {
          if (a.rating === b.rating) {
            return 0;
          }

          return a.rating > b.rating ? 1 : -1;
        },
        [SortBy.YEAR]: () => {
          if (a.year === b.year) {
            return 0;
          }

          return a.year > b.year ? 1 : -1;
        },
      };

      return sorting[movieSortData.sortBy ?? SortBy.ALPHABETICAL]();
    });

    if (sortData.direction === SortDirection.DESC) {
      sortedMovieList.reverse();
    }

    setMovies(sortedMovieList);
  };

  /* Here is a variant, if you want to use it in a useEffect */

  // useEffect(() => {
  //   const sortedMovieList = MOVIES.toSorted((a, b) => {
  //     const sorting = {
  //       [SortBy.ALPHABETICAL]: () => {
  //         if (a.title.toUpperCase() === b.title.toUpperCase()) {
  //           return 0;
  //         }

  //         return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
  //       },
  //       [SortBy.RATING]: () => {
  //         if (a.rating === b.rating) {
  //           return 0;
  //         }

  //         return a.rating > b.rating ? 1 : -1;
  //       },
  //       [SortBy.YEAR]: () => {
  //         if (a.year === b.year) {
  //           return 0;
  //         }

  //         return a.year > b.year ? 1 : -1;
  //       },
  //     };

  //     return sorting[sortData.sortBy ?? SortBy.ALPHABETICAL]();
  //   });

  //   if (sortData.direction === SortDirection.DESC) {
  //     sortedMovieList.reverse();
  //   }

  //   setMovies(sortedMovieList);
  // }, [sortData.direction, sortData.sortBy]);

  const removeMovie = (id: number) => {
    const newMovieList = movies.filter((movie) => movie.id !== id);

    setMovies(() => newMovieList);
  };

  const editMovie = (id: number) => {
    if (id === selectedMovieId) {
      setSelectedMovieId(undefined);
      return;
    }

    setSelectedMovieId(id);

    const newList = movies.map((movie) => {
      if (movie.id === id) {
        setInputValue(movie.title);
      }

      return movie;
    });

    setMovies(() => newList);
  };

  const renameMovie = (id: number) => {
    const newList = movies.map((movie) => {
      if (movie.id === id) {
        setSelectedMovieId(undefined);
        return { ...movie, title: inputValue };
      }

      return movie;
    });

    setMovies(() => newList);
  };

  /* Moved the input onChange to a dedicated function, so we can avoid inline functions. */
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Page contentClass="py-4">
      <div className="container">
        <SortingSelector
          sortData={sortData}
          updateSortingData={setMoviesOrder}
        />

        <table className="table table-dark table-bordered align-middle mt-3">
          <thead>
            <tr>
              {TABLE_COLUMNS.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {movies.map((movie) => {
              return (
                <tr
                  key={movie.id}
                  className={classNames({
                    [styles.selected]: movie.id === selectedMovieId,
                  })}
                >
                  <td className="px-3">
                    <MovieTitleAndInput
                      inputValue={inputValue}
                      movie={movie}
                      onRename={() => renameMovie(movie.id)}
                      onChange={onInputChange}
                      selectedMovieId={selectedMovieId}
                    />
                  </td>
                  <td>{movie.year}</td>
                  <td>{movie.rating}</td>
                  <td>
                    {/* Since the image does not convey any useful information, let's leave the alt text empty. */}
                    <img src={movie.thumbnail} alt="" />
                  </td>
                  <td>
                    {/* There is zero reason why this couldn't be a class */}
                    <div className={styles.actionsCell}>
                      <TableAction
                        color="red"
                        iconName="Trash"
                        action={() => removeMovie(movie.id)}
                      />
                      <TableAction
                        iconName="PencilFill"
                        action={() => editMovie(movie.id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Page>
  );
};

export default Movies;
