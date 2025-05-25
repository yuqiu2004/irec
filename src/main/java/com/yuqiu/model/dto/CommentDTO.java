package com.yuqiu.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentDTO {
    private String movieId;
    private String userName;
    private String text;
}
