declare const awsmobile: {
    aws_project_region: string;
    aws_appsync_graphqlEndpoint: string;
    aws_appsync_region: string;
    aws_appsync_authenticationType: string;
    aws_appsync_apiKey: string;
    aws_cloud_logic_custom: {
        name: string;
        endpoint: string;
        region: string;
    }[];
    aws_cognito_identity_pool_id: string;
    aws_cognito_region: string;
    aws_user_pools_id: string;
    aws_user_pools_web_client_id: string;
    oauth: {};
    aws_user_files_s3_bucket: string;
    aws_user_files_s3_bucket_region: string;
    aws_dynamodb_all_tables_region: string;
    aws_dynamodb_table_schemas: {
        tableName: string;
        region: string;
    }[];
};
export default awsmobile;
