import tw, { styled } from 'twin.macro';


export const StyledContainer = styled.div`
    ${tw`
        mx-20
    `}
`
export const StyledGenreName = styled.div`
    ${tw`
        text-2xl
        mt-10
        ml-28
        font-semibold
    `}
`
export const StyledPlaylist = styled.div`
    ${tw`
        flex
        flex-wrap
        mt-[10px]
    `}
    > div{
        ${tw`
            ml-10
            mb-10
            w-1/5
        `}
    }
`
