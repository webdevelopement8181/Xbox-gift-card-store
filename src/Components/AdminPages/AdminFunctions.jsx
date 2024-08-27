import {
    List,
    Create,
    Edit,
    Show,
    useDataGrid,
  } from '@refinedev/mui';
  
  import { useForm, useShow } from '@refinedev/core';
  import { DataGrid } from '@mui/x-data-grid';
  
export const CourseList = () => {
  const { dataGridProps } = useDataGrid();

  return (
    <List>
      <DataGrid {...dataGridProps} />
    </List>
  );
};

export const CourseCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form {...formProps}>
        <input placeholder="Title" {...formProps.register('title')} />
        <input placeholder="Instructor" {...formProps.register('instructor')} />
        <input placeholder="Price" {...formProps.register('price')} />
        <input placeholder="Image URL" {...formProps.register('image')} />
        <input placeholder="Detailed Description" {...formProps.register('detailedDescription')} />
        <input placeholder="Rating" {...formProps.register('rating')} />
        <input placeholder="Language" {...formProps.register('language')} />
        <input placeholder="Demo Video URL" {...formProps.register('demoVideo')} />
        <button type="submit">Save</button>
      </form>
    </Create>
  );
};

export const CourseEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form {...formProps}>
        <input placeholder="Title" {...formProps.register('title')} />
        <input placeholder="Instructor" {...formProps.register('instructor')} />
        <input placeholder="Duration" {...formProps.register('duration')} />
        <input placeholder="Price" {...formProps.register('price')} />
        <input placeholder="Image URL" {...formProps.register('image')} />
        <input placeholder="Detailed Description" {...formProps.register('detailedDescription')} />
        <input placeholder="Rating" {...formProps.register('rating')} />
        <input placeholder="Language" {...formProps.register('language')} />
        <input placeholder="Demo Video URL" {...formProps.register('demoVideo')} />
        <input placeholder="Additional Resources" {...formProps.register('additionalResources')} />
        <button type="submit">Save</button>
      </form>
    </Edit>
  );
};

export const CourseShow = () => {
  const { queryResult } = useShow();

  const { data } = queryResult;
  const record = data?.data;

  return (
    <Show>
      <div>
        <h1>{record?.title}</h1>
        <p>Instructor: {record?.instructor}</p>
        <p>Duration: {record?.duration} hours</p>
        <p>Price: ${record?.price}</p>
        {record?.cover && <img src={record.cover} alt={record.title} />}
        <h2>Course Details</h2>
        <p>{record?.detailedDescription}</p>
        <p>Rating: {record?.rating}</p>
        <p>Language: {record?.language}</p>
        {record?.demoVideo && (
          <div>
            <h3>Demo Video</h3>
            <video controls>
              {/* <source src={record.demoVideo} type="video/mp4" /> */}
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {record?.additionalResources && (
          <p>
            Additional Resources:{' '}
            <a href={record.additionalResources} target="_blank" rel="noopener noreferrer">
              {record.additionalResources}
            </a>
          </p>
        )}
      </div>
    </Show>
  );
};
