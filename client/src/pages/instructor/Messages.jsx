import React from "react";
import { Typography, Box, Paper, Grid, Divider } from "@mui/material";

const Messages = () => {
    return (
        <Box className="max-w-7xl mx-auto p-6">
            <Typography variant="h4" component="h1" className="mb-8">
                Tin nhắn
            </Typography>

            <Paper className="p-6">
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body1" align="center" className="my-8 text-gray-500">
                            Hệ thống tin nhắn đang được phát triển
                        </Typography>
                        <Divider className="my-4" />
                        <Typography variant="body2" align="center" className="text-gray-400">
                            Nội dung sẽ được cập nhật sau
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Messages;