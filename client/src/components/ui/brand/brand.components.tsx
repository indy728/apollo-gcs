import {InlineBrandSpan} from './brand.styles';

interface Props {
  fontSize?: string,
}

export const InlineBrand: React.FC<Props> = (props) => <InlineBrandSpan {...props}>meatport</InlineBrandSpan>