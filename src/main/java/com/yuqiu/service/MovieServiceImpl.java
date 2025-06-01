package com.yuqiu.service;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yuqiu.constant.MainTypeEnum;
import com.yuqiu.exception.BaseException;
import com.yuqiu.mapper.GenreMapper;
import com.yuqiu.mapper.MovieGenreMapper;
import com.yuqiu.mapper.MovieMapper;
import com.yuqiu.model.dto.MovieDTO;
import com.yuqiu.model.dto.MoviePageDTO;
import com.yuqiu.model.entity.Genre;
import com.yuqiu.model.entity.Movie;
import com.yuqiu.model.entity.MovieGenre;
import com.yuqiu.model.vo.MovieDetailVo;
import com.yuqiu.model.vo.MoviePageVo;
import com.yuqiu.model.vo.MovieTopVo;
import com.yuqiu.model.vo.MovieVo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService{

    @Resource
    private MovieMapper movieMapper;

    @Resource
    private GenreMapper genreMapper;

    @Resource
    private MovieGenreMapper movieGenreMapper;

    @Override
    public MoviePageVo page(MoviePageDTO moviePageDTO) {
        if (moviePageDTO.getPage() < 0 || moviePageDTO.getPageSize() < 0)
            throw new BaseException("参数错误");
        int pageSize = moviePageDTO.getPageSize();
        int page = (moviePageDTO.getPage() - 1) * pageSize;
        String genreName = moviePageDTO.getGenreName();
        Integer type = moviePageDTO.getType();
        int startYear = 0, endYear = 9999;
        if (moviePageDTO.getStartYear() != 0) startYear = moviePageDTO.getStartYear();
        if (moviePageDTO.getEndYear() != 0) endYear = moviePageDTO.getEndYear();
        long totalPage = movieMapper.selectCount(new QueryWrapper<Movie>());

        List<MovieVo> list = movieMapper.pageQuery(page, pageSize, genreName, type, startYear, endYear);
        return MoviePageVo.builder()
                .totalPage(totalPage)
                .movies(list.stream()
                        .peek(movie -> movie.setMainType(MainTypeEnum.getNameFromCode(movie.getType())))
                        .toList())
                .build();
    }

    @Override
    public List<MovieTopVo> top10() {
        QueryWrapper<Movie> wrapper = new QueryWrapper<>();
        wrapper.select("id", "title", "popularity").orderByDesc("popularity");
        List<Movie> list = movieMapper.selectList(wrapper);
        return list.stream()
                .map(m -> MovieTopVo.builder()
                        .id(m.getId())
                        .title(m.getTitle())
                        .popularity(m.getPopularity())
                        .build())
                .toList();
    }

    @Override
    public Boolean add(MovieDTO movieDTO) {
        Movie movie = new Movie();
        BeanUtil.copyProperties(movieDTO, movie);
        movie.setType(MainTypeEnum.getCodeByName(movieDTO.getType()));
        movie.setPopularity(0);
        movieMapper.insert(movie);
        // 插入类别 多线程处理
        List<String> genres = movieDTO.getGenres();
        genres.parallelStream().forEach(name -> {
            Genre one = genreMapper.selectOne((new QueryWrapper<Genre>()).eq("name", name));
            if (null == one) {
                one = Genre.builder()
                        .name(name)
                        .count(1)
                        .build();
                genreMapper.insert(one);
                MovieGenre movieGenre = MovieGenre.builder()
                        .movieId(movie.getId())
                        .genreId(one.getId())
                        .build();
                movieGenreMapper.insert(movieGenre);
            } else {
                one.setCount(one.getCount()+1);
                genreMapper.updateById(one);
                QueryWrapper<MovieGenre> wrapper = new QueryWrapper<>();
                wrapper.eq("movie_id", movie.getId()).eq("genre_id", one.getId());
                MovieGenre movieGenre = movieGenreMapper.selectOne(wrapper);
                if (null == movieGenre)
                    movieGenreMapper.insert(MovieGenre.builder()
                                                    .movieId(movie.getId())
                                                    .genreId(one.getId())
                                                    .build());
            }
        });
        return true;
    }

    @Override
    public MovieDetailVo detail(int id) {
        Movie movie = movieMapper.selectById(id);
        // 更新访问量
        movie.setPopularity(movie.getPopularity()+1);
        movieMapper.updateById(movie);
        MovieDetailVo movieDetailVo = new MovieDetailVo();
        BeanUtil.copyProperties(movie, movieDetailVo);
        movieDetailVo.setMainType(MainTypeEnum.getNameFromCode(movie.getType()));
        List<String> genres = movieGenreMapper.selectNameByMovieId(id);
        movieDetailVo.setGenres(genres);
        return movieDetailVo;
    }
}
