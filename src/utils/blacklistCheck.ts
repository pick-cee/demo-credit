import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const checkBlacklist = async (identity: any) => {
    try {
        const response = await axios.get(

            `https://adjutor.lendsqr.com/v2/verification/karma/${identity}`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.SECRET_KEY}`
                },
                maxBodyLength: Infinity
            }
        );
        return {
            status: response.status,
            data: response.data
        }

    }
    catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: error.response.status,
                data: error.response.data
            }
        }
        else {
            throw error
        }
    }
}

export { checkBlacklist }