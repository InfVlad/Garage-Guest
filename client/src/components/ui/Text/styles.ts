import { cva } from 'class-variance-authority';

export const textVariants = cva('font-montserrat', {
  variants: {
    variant: {
      title: 'text-2xl font-bold text-black',
      body: 'text-base font-normal',
      button: 'text-base font-semibold text-black',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});