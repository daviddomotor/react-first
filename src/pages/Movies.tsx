import { FC, useEffect, useState } from "react";
import { MOVIES } from "../data/movies";
import Page from "../components/Page";
import TableAction from "../components/TableAction";
import { Movie } from "../models/movie";
import styles from './Movies.module.css';
import classNames from "classnames";
import SortingSelector from "../components/SortingSelector";
import { SortBy, SortData, SortDirection } from "../models/sortingData";

const actionsCellStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
}

const defaultSortData: SortData = {
    direction: SortDirection.DESC,
    sortBy: SortBy.RATING
}

const Movies: FC = () => {
    const [movies, setMovies] = useState(MOVIES);
    const [inputValue, setInputValue] = useState('');
    const [selectedMovieId, setSelectedMovieId] = useState<number>();
    const [sortData, setSortData] = useState<SortData>(defaultSortData);
    const tableColumns = ['Title', 'Year', 'Rating', 'Thumbnail', ''];

    useEffect(() => {
        setMoviesOrder();
    }, [sortData]);

    function setMoviesOrder(): void {
        let sortedMovieList = MOVIES.toSorted((a, b) => {
            let returnValue: number;

            switch (sortData.sortBy) {
                case SortBy.ALPHABETICAL: {
                    if (a.title.toUpperCase() === b.title.toUpperCase()) {
                        returnValue = 0;
                        break;
                    }

                    returnValue = a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
                    break;
                }
                case SortBy.RATING: {
                    if (a.rating === b.rating) {
                        returnValue = 0;
                        break;
                    }

                    returnValue = a.rating > b.rating ? 1 : -1;
                    break;
                }
                case SortBy.YEAR: {
                    if (a.year === b.year) {
                        returnValue = 0;
                        break;
                    }

                    returnValue = a.year > b.year ? 1 : -1;
                    break;
                }
                default: {
                    if (a.title.toUpperCase() === b.title.toUpperCase()) {
                        returnValue = 0;
                        break;
                    }

                    returnValue = a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
                    break;
                }
            }

            return returnValue;
        })

        if (sortData.direction === SortDirection.DESC) {
            sortedMovieList.reverse();
        }

        setMovies(sortedMovieList)
    }


    function removeMovie(id: number) {
        const newMovieList = movies.filter((movie) => movie.id !== id)

        setMovies(() => newMovieList)
    }
    
    function editMovie(id: number) {
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
        })

        setMovies(() => newList);
    }

    function renameMovie(id: number) {
        const newList = movies.map((movie) => {
            if (movie.id === id) {
                setSelectedMovieId(undefined);
                return {...movie, title: inputValue}
            }

            return movie
        });

        setMovies(() => newList);
    }

    function getMovieTitleOrInput(movie: Movie) {
        if (movie.id === selectedMovieId) {
            return (
                <div className="d-flex gap-2">
                    <input type="text" className="form-control" onChange={(e) => setInputValue(e.target.value)} defaultValue={inputValue}/>
                    <button className="btn btn-primary" disabled={!inputValue.length} onClick={() => renameMovie(movie.id)}>Save</button>
                </div>
            )
        } else {
            return <>{movie.title}</>
        }
    }

    return (
        <Page contentClass="py-4">
            <div className="container">
                <SortingSelector sortData={sortData} updateSortingData={setSortData} />

                <table className="table table-dark table-bordered align-middle mt-3">
                    <thead>
                        <tr>
                            {tableColumns.map((column) => <th key={column}>{column}</th>)}
                        </tr>
                    </thead>
                    
                    <tbody>
                        {movies.map((movie) => {
                            return (
                                <tr key={movie.id} className={classNames({[styles.selected]: movie.id === selectedMovieId})}>
                                    <td className="px-3">
                                        {getMovieTitleOrInput(movie)}
                                    </td>
                                    <td>{movie.year}</td>
                                    <td>{movie.rating}</td>
                                    <td>
                                        <img src={movie.thumbnail} alt="mov_thumbnail" />
                                    </td>
                                    <td>
                                        <div style={actionsCellStyles}>
                                            <TableAction color="red" iconName="Trash" action={() => removeMovie(movie.id)} />
                                            <TableAction iconName="PencilFill" action={() => editMovie(movie.id)} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
        </Page>       
    )
}

export default Movies;
