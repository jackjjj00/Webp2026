import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Typography } from '@mui/material';

const columns = [
  { field: 'name', headerName: '名稱', width: 450 },
  { field: 'location', headerName: '地點', width: 300 },
  { field: 'price', headerName: '票價', width: 200 },
];

export default function App() {
  const [allData, setAllData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  // 使用 useEffect 呼叫 API，完美符合講義要求
  useEffect(() => {
    const apiUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item, index) => {
          let loc = "";
          let prc = "";
          
          if (item.showInfo && item.showInfo.length > 0) {
            loc = item.showInfo[0].location || "";
            prc = item.showInfo[0].price || "";
          }

          return {
            id: index, // DataGrid 必須的唯一識別碼
            name: item.title,
            location: loc,
            price: prc,
          };
        });

        setAllData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("抓取資料失敗：", error);
        setLoading(false);
      });
  }, []); 

  // 處理搜尋過濾
  const filteredData = allData.filter((row) =>
    row.name.includes(keyword)
  );

  return (
    <Box sx={{ p: 4, width: '100%', maxWidth: 1000, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ mr: 4, fontWeight: 'bold' }}>
          景點觀光展覽資訊
        </Typography>
        
        <TextField
          label="搜尋名稱..."
          variant="outlined"
          size="small"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      {/* 使用 datagrid 改寫 table */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50]} 
          disableSelectionOnClick 
        />
      </Box>
    </Box>
  );
}